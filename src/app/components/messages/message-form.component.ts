import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {Message} from '../../shared/models/message.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { format } from 'date-fns';

@Component({
  selector: 'app-message-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogTitle, MatDialogContent],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})
export class MessageFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MessageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {
    this.form = this.fb.group({
      timestamp: [data ? format(new Date(data.timestamp), 'yyyy-MM-dd HH:mm:ss.SSS') : '', [Validators.required, Validators.minLength(3)]],
      content: [data ? data.content : '', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const message: Message = this.form.value;
      this.dialogRef.close(message);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
