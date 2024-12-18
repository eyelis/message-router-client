import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Partner} from '../../shared/models/partner.model';
import {PartnerFormComponent} from './partner-form.component';


import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {PartnerService} from '../../shared/services/partners.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-partner-list',
  standalone: true,
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss'],
  imports: [
    MatTable,
    MatHeaderRow,
    MatRow,
    MatButton,
    MatCell,
    MatHeaderCell,
    MatHeaderCellDef,
    MatColumnDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatPaginator
  ]
})
export class PartnerListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'type', 'alias', 'direction', 'flow', 'application', 'description', 'actions'];
  partners: MatTableDataSource<Partner>;
  private subscription: Subscription | null = null;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private partnerService: PartnerService, private dialog: MatDialog) {
    this.partners = new MatTableDataSource();
    this.partners.sort = this.sort;
    this.partners.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadPartners()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadPartners(): void {
    this.subscription  = this.partnerService.getPartners().subscribe(data => {
      this.partners = new MatTableDataSource(data);
      this.partners.paginator = this.paginator;
      this.partners.sort = this.sort;
    });
  }

  openDetail(partner?: Partner): void {
    const dialogRef = this.dialog.open(PartnerFormComponent, {data: partner});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.partnerService.createPartner(result).subscribe({
          next: () => {
            this.loadPartners();
          },
          error: () => {
            console.error('Error creating partner.');
          },
        });
      }
    });

  }

  addPartner(): void {
    this.openDetail();
  }

  deletePartner(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {message: 'Are you sure you want to delete this partner?'},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.partnerService.deletePartner(id).subscribe({
          next: () => {
            const data = this.partners.data;
            this.partners.data = data.filter((partner) => partner.id !== id);
            console.log('Partner successfully deleted.');
          },
          error: (err) => {
            console.error('Failed to delete partner:', err);
          },
          complete: () => {
            console.log('Delete operation completed.');
          },
        });
      }
    });
  }

}
