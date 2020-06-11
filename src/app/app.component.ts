import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  AbstractControl,
  Validators,
  FormArray
} from "@angular/forms";
import {
  startWith,
  pairwise,
  tap,
  map,
  filter,
  distinctUntilChanged,
  debounceTime,
  takeUntil
} from "rxjs/operators";
import { combineLatest, Subject, of } from "rxjs";
import { AppService } from "./app.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
 constructor(public cdrf:ChangeDetectorRef
 ,public appService:AppService){

 }
 
  ngOnInit(){}

 initializeForm(){
   this.appService.isFormInitialized=true;
   this.cdrf.detectChanges()
 }

 destroyForm(){
   this.appService.isFormInitialized=false;
 }
}
