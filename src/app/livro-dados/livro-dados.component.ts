import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../models/livro';
import { Editora } from '../models/editora';
import { ControleEditoraService } from '../services/controle-editora.service';
import { ControleLivroService } from '../services/controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})

export class LivroDadosComponent implements OnInit {
  public livro: Livro = new Livro(0, 0, '', '', []);
  public autoresForm: string = '';
  public editoras: Array<Editora> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = () => {
    this.livro.autores = this.autoresForm.split('\n').map(a => a.trim()).filter(a => a !== '');
    if (!this.livro.titulo || this.livro.codEditora === undefined || this.livro.autores.length === 0) {
      console.error('Título, Editora ou Autores não podem estar vazios');
      return;
    }
    this.livro.codEditora = Number(this.livro.codEditora);
    this.servLivros.incluir(this.livro);
    this.router.navigateByUrl('/lista');    
  }
}