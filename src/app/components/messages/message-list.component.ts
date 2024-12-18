import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../shared/models/message.model';
import { MessageFormComponent } from './message-form.component';
import {MessageService} from '../../shared/services/messages.service';

import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DatePipe} from '@angular/common';
import {DataTestidDirective} from '../../data-testid.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message-list',
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
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
    MatPaginator,
    DatePipe,
    DataTestidDirective
  ]
})
export class MessageListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'timestamp', 'key', 'content', 'actions'];
  messages: MatTableDataSource<Message>;
  private subscription: Subscription | null = null;

  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private messageService: MessageService, private dialog: MatDialog) {
    this.messages = new MatTableDataSource();
    this.messages.sort = this.sort;
    this.messages.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessages().subscribe(data => {
      this.messages = new MatTableDataSource(data);
      this.messages.paginator = this.paginator;
      this.messages.sort = this.sort;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDetail(message: Message): void {
    this.dialog.open(MessageFormComponent, { data: message });
  }

}
