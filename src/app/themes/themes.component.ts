import { Component, OnInit } from "@angular/core";
import { TopicsService } from "../services/topics-service/topics.service";

@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    styleUrls: [ './themes.component.scss' ],
})
export class ThemesComponent implements OnInit {
    themes: Object[];

    constructor( public topicsService: TopicsService ) {
        this.themes = [];
        console.log(topicsService.getTopics());
        topicsService.getTopics()
            .subscribe(
                response => {
                    this.themes = response;
                    console.log(this.themes);
                },
                error => console.log(error),
                () => console.log('done')
            );
    }

    ngOnInit() {
    }

}
