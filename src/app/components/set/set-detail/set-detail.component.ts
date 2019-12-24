import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Set } from 'src/app/data/entities/activity';
import { FormGroup, FormControl } from '@angular/forms';
import { randonGuidGenerator } from 'src/app/shared/helper';
@Component({
  selector: 'app-set-detail',
  templateUrl: './set-detail.component.html',
  styleUrls: ['./set-detail.component.css']
})
export class SetDetailComponent implements OnInit {

  @Input() set: Set
  @Output() onSetChange = new EventEmitter()

  weightId
  repId

  setForm = new FormGroup({
    weight: new FormControl('', { updateOn: 'change' }),
    reps: new FormControl('', { updateOn: 'change' })
  });

  constructor() { }

  ngOnInit() {
    this.weightId = `weight_${randonGuidGenerator()}`
    this.repId = `rep_${randonGuidGenerator()}`

    this.setForm.patchValue({
      weight: this.set.weight,
      reps: this.set.reps
    });

    this.setForm.valueChanges.subscribe(value => this.readForm(value))
  }

  readForm(value): void {
    //check if values match what is
    var uniqueSet = {
      order: this.set.order,
      reps: value.reps,
      weight: value.weight
    };
    // emit unique set
    this.onSetChange.emit(uniqueSet)
  }
}
