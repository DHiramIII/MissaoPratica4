import { Injectable } from '@angular/core';
import { Livro }  from '../models/livro';

@Injectable({
  providedIn: 'root'
})

export class ControleLivroService {

  private livros: Livro[] = [];

  constructor()  {
    this.livros.push(new Livro(1, 1, 'Livro 1', 'Resumo do Livro 1', ['Autor 1'] ));
    this.livros.push(new Livro(2, 2, 'Livro 2', 'Resumo do Livro 2', ['Autor 2', 'Autor 3']));
    this.livros.push(new Livro(3, 3, 'Livro 3', 'Resumo do Livro 3', ['Autor 4']));
  }
  
  obterLivros(): Array<Livro> {
    return this.livros;
  }

  incluir(livro: Livro): Promise<void> {
    const novoCodigo = this.livros.length > 0 ? Math.max(...this.livros.map(l => l.codigo)) + 1 : 1;
    livro.codigo = novoCodigo;
    return new Promise((resolve) => {
      this.livros.push(livro); // Adiciona o novo livro
      resolve();
    });
  }

  excluir(codigo: number): void {
    this.livros = this.livros.filter(livro => livro.codigo !== codigo);
  }
}

export const controleLivroService = new ControleLivroService();