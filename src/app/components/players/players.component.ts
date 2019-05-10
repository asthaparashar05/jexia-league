import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PlayerWithGames } from '../../services/model';
import { PlayerService } from '../../services/player.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  @Input () playerProfile: PlayerWithGames = {
    name: '',
    foosball: {},
    carRacing: {},
    tableTennis: {},
  } as PlayerWithGames;

  @ViewChild('f') form: NgForm;

  ngOnInit() {
  }

  createPlayer() {
    this.playerService.createPlayer(this.playerProfile);
  }

}
