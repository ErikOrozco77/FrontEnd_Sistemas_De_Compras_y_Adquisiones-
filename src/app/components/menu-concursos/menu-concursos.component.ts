import { Component } from '@angular/core';
import { ConcursoService } from 'src/app/_services/concurso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-concursos',
  templateUrl: './menu-concursos.component.html',
  styleUrls: ['./menu-concursos.component.css']
})
export class MenuConcursosComponent {
  concursos: any[] = [];
  constructor(private concursoService: ConcursoService, private router: Router) { }

  ngOnInit(): void {
    this.getConcursosActivosSinGanador();
  }

  getConcursosActivosSinGanador(): void {
    this.concursoService.getConcursosActivos()
      .subscribe(concursos => {
        this.concursos = concursos.filter(concurso =>
          concurso.isActive === true && concurso.proveedorGanador === null
        );
      });
  }
  seleccionarConcurso(idConcurso: string): void {
    this.router.navigate(['/seleccionDeProveedores', idConcurso]);
  }

  navigateToAdminMode() {
    this.router.navigate(['/admin-mode']);
  }
}

