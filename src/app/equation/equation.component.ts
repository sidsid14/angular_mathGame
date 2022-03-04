import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { delay, filter } from 'rxjs';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }

  constructor() {}

  ngOnInit(): void {
    this.mathForm.statusChanges
      .pipe(filter((value) => value === 'VALID'))
      .pipe(delay(500))
      .subscribe(() => {
        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber(): number {
    return Math.floor(Math.random() * 10);
  }
}
