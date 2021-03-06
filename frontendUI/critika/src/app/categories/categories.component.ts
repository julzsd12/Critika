import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './categories.model';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, } from '@angular/forms';
import { Submission } from '../models/submissions.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService],
})

export class CategoriesComponent implements OnInit {
  chosenSubmission: Submission;
  categoriesForm: FormGroup;
  submissions: Object;
  categoriesForFilter: Object;
  renderComponent: string = "";
  categoryNames: String[];
  textAreasList: any = [];
  topThreeCategories: Object;

  constructor(public subService: CategoriesService, private formBuilder: FormBuilder) {
    this.categoryNames = [];
    this.submissions = [];
    this.categoriesForFilter = [];
    this.topThreeCategories = [];
  }

  renderFileReport() {
    this.renderComponent = "file-report";
  }

  ngOnInit() {
    this.categoriesForm = this.formBuilder.group({
      categoryName: [''],
      categoryDescription: [''],
    });
    this.updateCategories()
    this.renderComponent = "reload";
  }

  addTextarea() {
    this.textAreasList.push('text_area' + (this.textAreasList.length + 1));
  }
  renderViewSub(sub:Submission) {
    this.chosenSubmission = sub;
    this.renderComponent = 'ViewSub';
}

  updateCategories() {
    this.subService.getAllCategories().then((categories) => {
      //categories is an array of all categories
      this.categoriesForFilter = categories;
      let i: number;
      for (let x in categories) {
        var name = categories[x].categoryName
        this.categoryNames[i] = name
      }
      console.log(categories)
    }).then(()=>{
      this.getTopCategories()
    })
  }
  

  getSubmissionsInCategory(category) {
    // console.log(category)
    this.subService.getAllSubmissionsInCategory(category).then((subs) => {
      // console.log(subs)
      this.submissions = subs;
      console.log(subs)
    })
  }

  getChildEvent(event:string){
    this.renderComponent = 'reload';
    this.subService.getAllCategories().then((categories) => {
      //categories is an array of all categories
      this.categoriesForFilter = categories;
      let i: number;
      for (let x in categories) {
        var name = categories[x].categoryName
        this.categoryNames[i] = name
      }
      console.log(categories)
    }).then(()=>{
      this.getTopCategories()
    });
  }

  createCategory(form: NgForm) {

    console.log(form)

    this.subService.createCategory(form).then((cats) => {
      this.updateCategories()
    })
  }

  addComment(form: NgForm, sub){

    console.log(sub)

    // this.subService.addComment(form, sub).then((sub) => {
    //   console.log(sub)
    // })
  }

  getTopCategories(){
      this.subService.getTopCategories().then((cat) => {
        let i:number = 0;
        let length = Object.keys(cat).length;
        if(length < 3){
          for(i = 0; i < length; i++){
            this.topThreeCategories[i] = cat[i]
          }
        }
        else{
          this.topThreeCategories[0] = cat[0];
          this.topThreeCategories[1] = cat[1];
          this.topThreeCategories[2] = cat[2];
        }
      })
  }


}

