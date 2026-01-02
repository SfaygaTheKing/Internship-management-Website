import { AuthService } from './../../../controllers/auth/auth.service';
import { EtudiantService } from './../../../controllers/etudiant/etudiant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { Etudiant } from '../../../models/etudiant/etudiant';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { NgFor, NgIf } from '@angular/common';
import * as FileSaver from 'file-saver';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    TableModule,
    ToolbarModule,
    MenuModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
  ],
  templateUrl: './etudiant-list.component.html',
  styleUrl: './etudiant-list.component.css',
})
export class EtudiantListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private etudiantService: EtudiantService
  ) {
    this.items = [
      {
        label: 'CSV',
        icon: 'pi pi-fw pi-file',
        command: () => {
          this.dataTable.exportCSV();
        },
      },
      {
        label: 'Excel',
        icon: 'pi pi-fw pi-file-excel',
        command: () => {
          this.exportExcel();
        },
      },
      {
        label: 'PDF',
        icon: 'pi pi-fw pi-file-pdf',
        command: () => {
          this.exportPdf();
        },
      },
    ];
    this.columns = [
      { field: 'numero', header: 'Numero' },
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prénom' },
      { field: 'promotion.annee', header: 'Promotion' },
      { field: 'mention', header: 'Mention' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.etudiantService.findAll().subscribe({
      next: (data) => (this.etudiants = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['etudiant/create']);
  }

  edit(etudiant: Etudiant): void {
    this.selectedEtudiant = etudiant;
    this.router.navigate(['etudiant/edit']);
  }

  view(etudiant: Etudiant): void {
    this.selectedEtudiant = etudiant;
    this.router.navigate(['etudiant/view']);
  }

  delete(etudiant: Etudiant): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.etudiantService.deleteByNumero(etudiant.numero).subscribe({
          next: (data) => {
            if (data === 1) {
              this.etudiants = this.etudiants.filter(
                (e) => e.id !== etudiant.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Étudiant supprimé',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail:
                  "Étudiant non supprimé : lié à d'autres enregistrements supprimez-les avant de réessayer",
                life: 3000,
              });
            }
          },
          error: (e) => console.error(e),
        });
      },
    });
  }

  exportPdf(): void {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.etudiants);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.etudiants);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'data');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  isAdmin(): boolean {
    if (this.authService.retrieveUser().user.role === 'ADMIN') return true;
    return false;
  }

  public get selectedEtudiant(): Etudiant {
    return this.etudiantService.selectedEtudiant;
  }
  public set selectedEtudiant(value: Etudiant) {
    this.etudiantService.selectedEtudiant = value;
  }
  public get etudiants(): Array<Etudiant> {
    return this.etudiantService.etudiants;
  }
  public set etudiants(value: Array<Etudiant>) {
    this.etudiantService.etudiants = value;
  }
}
