import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss'],
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.getAllEntries();
  }

  getAllEntries() {
    this.entryService.getAll().subscribe(
      (entries) => (this.entries = entries),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteEntry(entry: Entry): void {
    const mustDelete = confirm(
      `Deseja realmente excluir a categoria: ${entry.name}`
    );

    if (mustDelete) {
      this.entryService.delete(entry.id).subscribe(
        () =>
          (this.entries = this.entries.filter((el) => el !== entry)),
        (error) => alert(`Erro ao excluir a categoria: ${entry.name}`)
      );
    }
  }
}
