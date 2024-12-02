import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {Direction, Flow, Partner} from '../../shared/models/partner.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {MatOption, MatSelect} from '@angular/material/select';
import {PartnerService} from '../../shared/services/partners.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partner-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, MatDialogTitle, MatDialogContent, MatSelect, MatOption, NgForOf],
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.scss']
})
export class PartnerFormComponent {
  form: FormGroup;
  directions = Object.values(Direction);
  flows = Object.values(Flow);
  errorMessage = '';
  isReadOnly: boolean = false;

  constructor(
    private partnerService: PartnerService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PartnerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partner
  ) {
    this.isReadOnly = !!data

    this.form = this.fb.group({
      type: [data ? data.type : '', [Validators.required, Validators.maxLength(100) ]],
      alias: [data ? data.alias : '', [Validators.required, Validators.maxLength(100)]],
      direction: [data ? data.direction : null],
      flow: [data ? data.flow : null],
      application: [data ? data.application : '', Validators.maxLength(250)],
      description: [data ? data.description : '',  Validators.maxLength(250)]
    });

  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  makeFormReadOnly(): void {
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.get(controlName)?.disable({ onlySelf: true, emitEvent: false });
    });
  }
}
