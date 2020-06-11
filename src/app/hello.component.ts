import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { startWith, pairwise, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'hello',
  template: `<div *ngIf="initialze" [formGroup]="myForm" >
    <div formArrayName="lists" *ngFor="let a of myForm.get('lists').controls; let i = index">
    <div [formGroupName]="i" style="margin-bottom: 10px;">
      <label for="name">Name:</label>
      <input type="text" name="name" formControlName="name">
    </div>
  </div>
</div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent implements OnInit,OnDestroy  {
 

 isFormInitialized = false;
  myForm: FormGroup;
  AuditUnsubscribe: Subject<any> = new Subject();
  public unsubscribe: Subject<any> = new Subject();
  groupName = "lists";
  property = "name";
  initialze = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.formBuilder.group({});
  }
  ngAfterViewInit() {
    let controlarray1 = this.formBuilder.array([]);
    this.myForm.addControl(this.groupName, controlarray1);
    let groupControl = this.formBuilder.control(null);

    const control = this.myForm.controls[this.groupName] as FormArray;
    this.myForm.setControl(this.groupName, control);
    var listControl = this.formBuilder.group({});
    var ctr = this.formBuilder.control(null);
    listControl.addControl("name", ctr);
    control.push(listControl);
    console.log(this.myForm);

    this.subsubscribeToFormControlValueChanges(listControl, ctr, "name");
    this.initialze = true;
  }

   ngOnDestroy(){
    this.myForm = null;
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.AuditUnsubscribe.next()
    this.AuditUnsubscribe.complete();
  }

  subsubscribeToFormControlValueChanges(
    group: FormGroup,
    fctrl: FormControl,
    propertyName
  ) {
    if (fctrl) {
      fctrl.valueChanges
        .pipe(
          startWith(null),
          pairwise()
        )
        .pipe(distinctUntilChanged())
        .subscribe(([prev, next]: [any, any]) => {
          // var configId = group.get("name");
          console.log(next);
        });
    }
  }
  
   
}
