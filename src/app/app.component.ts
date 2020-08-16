import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  currentDraggedItem: any;
  display: boolean = false;
  droppedItems = [];
  finalString: any="";
  dragEnabled = true;
  htmlText: any;

  elementsList = [
    { name: 'Label', type: 'label', inputType: 'label' },
    { name: 'text', type: 'input-text', inputType: 'text', placeholder: '' },
    { name: 'checkbox', type: 'input-check', inputType: 'checkbox', placeholder: null, displayText: 'Check box' }];

  onAnyDrop(e: any) {
    this.currentDraggedItem = e;

    transferArrayItem(e.previousContainer.data,
      e.container.data,
      e.previousIndex,
      e.currentIndex);
  
    // if ( e.container.data[e.currentIndex].type !== 'label') { this.display = true; }
    // else {
      this.updateDroppedItem(this.currentDraggedItem);
    // }

  }

  updateDroppedItem(e: any): void {
    // this.currentDraggedItem.dragData.placeholder = e.placeholder;
    // this.droppedItems.push(this.currentDraggedItem.container.data[e.currentIndex]);
    this.updateHtmlCode();
    this.finalString += this.renderHtmlCode(this.currentDraggedItem.container.data[e.currentIndex]);
  }

  updateHtmlCode(): void {
    this.htmlText = this.droppedItems;
  }

  renderHtmlCode(htmlObject: any): string {
    if (htmlObject.inputType === 'label') {
      return '<label> </label>';
    } else {
      return '<input type="' + htmlObject.inputType
        + '" placeholder="' + htmlObject.placeholder + '" />';
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
