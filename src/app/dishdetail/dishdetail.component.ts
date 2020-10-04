import { Component, OnInit ,ViewChild } from '@angular/core';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';
import { Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback1} from '../shared/feedback1';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  
  dish : Dish;
  dishIds: string[];
  prev: string;
  next: string;

  feedbackForm: FormGroup;
    feedback: Feedback1;
   
    @ViewChild('fform') feedbackFormDirective;
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,private fb: FormBuilder) {this.createForm(); }

    formErrors = {
      'author': '',
      'comment' :'',
      
    };
  
    validationMessages = {
      'author': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      'comment': {
        'required' :'Feedback is required.'
      },
    };

  ngOnInit() {


    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating:5,
      comment: ['' ,Validators.required]
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1);
    }
    return value;
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedback.date=new Date().toISOString();
    console.log(this.feedback);
    this.dish.comments.push(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      rating:'5',
      message: ''
    });
    this.feedbackFormDirective.resetForm({
      firstname: '',
      rating:'5',
      message: ''
    });
  }

}
