import { Entreprise } from './../../../models/entreprise/entreprise';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { EntrepriseService } from '../../../controllers/entreprise/entreprise.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import * as FileSaver from 'file-saver';

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
  selector: 'app-entreprise-list',
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
  templateUrl: './entreprise-list.component.html',
  styleUrl: './entreprise-list.component.css',
})
export class EntrepriseListComponent implements OnInit {
  items: MenuItem[] | undefined;
  @ViewChild('dt') dataTable!: Table;
  columns!: Column[];
  exportColumns!: ExportColumn[];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private entrepriseService: EntrepriseService
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
      { field: 'raisonSociale', header: 'Raison sociale' },
      { field: 'ville', header: 'Ville' },
      { field: 'telephone', header: 'Téléphone' },
    ];

    this.exportColumns = this.columns.map((column) => ({
      title: column.header,
      dataKey: column.field,
    }));
  }

  ngOnInit() {
    this.entrepriseService.findAll().subscribe({
      next: (data) => (this.entreprises = data),
      error: (e) => console.error(e),
    });
  }

  create(): void {
    this.router.navigate(['entreprise/create']);
  }

  edit(entreprise: Entreprise): void {
    this.selectedEntreprise = entreprise;
    this.router.navigate(['entreprise/edit']);
  }

  view(entreprise: Entreprise): void {
    this.selectedEntreprise = entreprise;
    this.router.navigate(['entreprise/view']);
  }

  delete(entreprise: Entreprise): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Non',
      rejectButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.entrepriseService.deleteByNumero(entreprise.numero).subscribe({
          next: (data) => {
            if (data === 1) {
              this.entreprises = this.entreprises.filter(
                (e) => e.id !== entreprise.id
              );
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Entreprise supprimé',
                life: 3000,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Échec',
                detail:
                  "Entreprise non supprimé : lié à d'autres enregistrements supprimez-les avant de réessayer",
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
        (doc as any).autoTable(this.exportColumns, this.entreprises);
        doc.save('data.pdf');
      });
    });
  }

  exportExcel(): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.entreprises);
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

  public get selectedEntreprise(): Entreprise {
    return this.entrepriseService.selectedEntreprise;
  }
  public set selectedEntreprise(value: Entreprise) {
    this.entrepriseService.selectedEntreprise = value;
  }

  public get entreprises(): Array<Entreprise> {
    return this.entrepriseService.entreprises;
  }
  public set entreprises(value: Array<Entreprise>) {
    this.entrepriseService.entreprises = value;
  }
}
