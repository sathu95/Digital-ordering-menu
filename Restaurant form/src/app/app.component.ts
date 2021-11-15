import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'restaurant-form';

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private _homeService: HomeService) {
    this.productForm = this.fb.group({
      sections: this.fb.array([]),
      restaurant_name: ['', Validators.required],
    });
  }

  sections(): FormArray {
    return this.productForm.get('sections') as FormArray;
  }

  newSection(): FormGroup {
    return this.fb.group({
      sectionName: '',
      items: this.fb.array([]),
    });
  }

  addSection() {
    this.sections().push(this.newSection());
  }

  removeSection(secIndex: number) {
    this.sections().removeAt(secIndex);
  }

  sectionItems(secIndex: number): FormArray {
    return this.sections().at(secIndex).get('items') as FormArray;
  }

  newItem(): FormGroup {
    return this.fb.group({
      item: '',
      price: '',
      description: '',
    });
  }

  addSectionItems(secIndex: number) {
    this.sectionItems(secIndex).push(this.newItem());
  }

  removeSectionItems(secIndex: number, itemIndex: number) {
    this.sectionItems(secIndex).removeAt(itemIndex);
  }

  onSubmitFrom() {
    if (this.productForm.invalid) {
      return;
    }
    const formData = this.productForm.getRawValue();
    this._homeService.addRestaurantData(formData).subscribe((responce) => {
      console.log('responce: ', responce);
    });
  }
}
