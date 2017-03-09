import { Component, OnInit } from "@angular/core";
import { TopicsService } from "../services/topics-service/topics.service";

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: [ './topics.component.scss' ],
})
export class TopicsComponent implements OnInit {
    topics: Object[];

    constructor( public topicsService: TopicsService ) {
        this.topics = [];
        console.log(topicsService.getTopics());
        topicsService.getTopics()
            .subscribe(
                response => {
                    this.topics = response;
                    console.log(this.topics);
                },
                error => console.log(error),
                () => console.log('done')
            );
    }

    ngOnInit() {
    }

}
