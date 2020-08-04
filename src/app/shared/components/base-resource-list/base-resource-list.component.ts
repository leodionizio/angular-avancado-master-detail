import { OnInit, Directive } from '@angular/core';

import { BaseResourceModel } from '../../models/base.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = [];

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit(): void {
    this.getAllResources();
  }

  getAllResources() {
    this.resourceService.getAll().subscribe(
      (resources) => (this.resources = resources.sort((a, b) => b.id - a.id)),
      (error) => alert('Erro ao carregar a lista!')
    );
  }

  deleteResource(resource: T): void {
    const mustDelete = confirm(`Deseja realmente excluir: ${resource['name']}`);

    if (mustDelete) {
      this.resourceService.delete(resource.id).subscribe(
        () => (this.resources = this.resources.filter((el) => el !== resource)),
        (error) => alert(`Erro ao excluir: ${resource['name']}`)
      );
    }
  }
}
