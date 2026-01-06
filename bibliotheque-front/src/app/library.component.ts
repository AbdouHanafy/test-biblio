import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: any[] = [];
  newTitle = '';
  isSubmitting = false;
  isLoading = false;
  errorMsg: string | null = null;
  successMsg: string | null = null;

  editingId: number | null = null;
  editTitle = '';

  // Confirmation modals
  showDeleteModal = false;
  showEditModal = false;
  bookToDelete: any = null;
  bookToEdit: any = null;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWJkb3UifQ.-pvlu5N5wd-fh5t6mNS3lY92RekIMn2_qVxQi_dH9R8');
    this.loadBooks();
  }

  loadBooks() {
    this.isLoading = true;
    this.errorMsg = null;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Erreur de chargement des livres';
        this.isLoading = false;
      }
    });
  }

  addBook() {
    this.errorMsg = null;
    this.successMsg = null;
    const title = this.newTitle?.trim();
    if (!title) {
      this.showError('Le titre est requis');
      return;
    }
    this.isSubmitting = true;
    this.bookService.createBook(title).subscribe({
      next: () => {
        this.showSuccess('Livre ajouté avec succès !');
        this.newTitle = '';
        this.loadBooks();
        this.isSubmitting = false;
      },
      error: () => {
        this.showError("Erreur lors de l'ajout du livre");
        this.isSubmitting = false;
      },
    });
  }

  startEdit(book: any) {
    this.editingId = book.id;
    this.editTitle = book.title;
    this.clearMessages();
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
    this.clearMessages();
  }

  saveEdit() {
    const title = this.editTitle?.trim();
    if (!title) {
      this.showError('Le titre ne peut pas être vide');
      return;
    }
    if (this.editingId === null) return;
    
    this.isSubmitting = true;
    this.bookService.updateBook(this.editingId, title).subscribe({
      next: () => {
        this.showSuccess('Livre modifié avec succès !');
        this.cancelEdit();
        this.loadBooks();
        this.isSubmitting = false;
      },
      error: () => {
        this.showError('Erreur lors de la modification');
        this.isSubmitting = false;
      },
    });
  }

  delete(book: any) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${book.title}" ?`)) return;
    
    this.isSubmitting = true;
    this.bookService.deleteBook(book.id).subscribe({
      next: () => {
        this.showSuccess('Livre supprimé avec succès !');
        this.loadBooks();
        this.isSubmitting = false;
      },
      error: () => {
        this.showError('Erreur lors de la suppression');
        this.isSubmitting = false;
      },
    });
  }

  showError(msg: string) {
    this.errorMsg = msg;
    this.successMsg = null;
    setTimeout(() => this.errorMsg = null, 5000);
  }

  showSuccess(msg: string) {
    this.successMsg = msg;
    this.errorMsg = null;
    setTimeout(() => this.successMsg = null, 5000);
  }

  closeError() {
    this.errorMsg = null;
  }

  closeSuccess() {
    this.successMsg = null;
  }

  clearMessages() {
    this.errorMsg = null;
    this.successMsg = null;
  }
}