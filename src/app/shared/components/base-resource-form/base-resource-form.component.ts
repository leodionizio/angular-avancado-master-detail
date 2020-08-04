import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import toastr from 'toastr';

import { BaseResourceModel } from '../../models/base.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  protected setCurrentAction() {
    this.currentAction =
      this.route.snapshot.url[0].path === 'new' ? 'new' : 'edit';
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params) => this.resourceService.getById(+params.get('id')))
        )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource);
          },
          (error) => alert('Ocorreu um erro no servidor!')
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.createPageTitle();
    } else {
      this.pageTitle = this.editPageTitle();
    }
  }

  protected createPageTitle(): string {
    return 'Novo';
  }

  protected editPageTitle(): string {
    return 'Edição';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.create(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource).subscribe(
      (resource) => this.actionsForSuccess(resource),
      (error) => this.actionsForError(error)
    );
  }

  protected actionsForSuccess(resource: T) {
    toastr.success('Solicitação processada com sucesso!');

    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router
      .navigateByUrl(baseComponentPath, { skipLocationChange: true })
      .then(() =>
        this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }

  protected actionsForError(error) {
    toastr.error('Ocorreu um erro ao processar sua solicitação!');

    this.submittingForm = false;

    if (error.status === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = [
        'Falha na comunicação com servidor. Por favor, tente mais tarde!',
      ];
    }
  }

  protected abstract buildResourceForm(): void;
}
