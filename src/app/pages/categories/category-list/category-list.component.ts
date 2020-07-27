import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      (categories) => (this.categories = categories),
      (error) => alert('Erro ao carregar a lista')
    );
  }

  deleteCategory(category: Category): void {
    const mustDelete = confirm(
      `Deseja realmente excluir a categoria: ${category.name}`
    );

    if (mustDelete) {
      this.categoryService.delete(category.id).subscribe(
        () =>
          (this.categories = this.categories.filter((el) => el !== category)),
        (error) => alert(`Erro ao excluir a categoria: ${category.name}`)
      );
    }
  }
}
