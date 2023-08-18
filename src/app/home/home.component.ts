import { Component, OnInit } from '@angular/core';
import { IMAGES_DATA } from '../images.data';

interface Image {
  id: number;
  category: string;
  identified: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photoContainer: any;
  images: Image[] = IMAGES_DATA;
  currentCategory: string = 'all';

  ngOnInit() {
    this.photoContainer = document.getElementById('photo-container');
    this.generatePhotoContent();
  }

  generatePhotoContent() {
    let content = '';

    for (let i = 0; i < this.images.length; i++) {
      if (this.currentCategory === 'all' || this.images[i].category === this.currentCategory) {
        if (i % 3 === 0) {
          content += "<div class='column'>";
        }

        if (this.images[i].identified) {
          content += this.getPhotoElement(this.images[i].id);
        }

        if ((i + 1) % 3 === 0) {
          content += "</div>";
        }
      }
    }
    this.photoContainer.innerHTML = content;
  }

  getPhotoElement(photo_id: number): string {
    return `<a class="photo">
      <img alt="Foto ${photo_id}" src="assets/images/photo_${photo_id}.jpg"/>
    </a>`;
  }

  filterImagesByCategory(category: string) {
    this.currentCategory = category;
    this.generatePhotoContent();
  }
}