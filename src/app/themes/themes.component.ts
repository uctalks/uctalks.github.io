import { Component, OnInit } from '@angular/core';

import { Theme } from './theme'

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  themes: Theme[];

  constructor() {
    this.themes = [
        new Theme (
            'Theme 1'
        ),
        new Theme (
            'Theme 2'
        ),
        new Theme (
            'Theme 3'
        )
    ];
      console.log(this.themes);
  }

  ngOnInit() {
  }

}
