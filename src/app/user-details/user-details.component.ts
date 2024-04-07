import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserData } from 'src/model/user-data';
import { MarkdownPipe } from 'src/utils/markdown.pipe';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public id = 0;
  public user: UserData = <UserData>{};
  public markdown: string = "";
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id')) || 0;
    this.userService.findOneById(this.id).subscribe( {
      next: (user) => {
        this.user = user;
        let markdownPipe = new MarkdownPipe();
        this.markdown = markdownPipe.transform(user.bio);
      },
      error: () => {
        this.router.navigateByUrl('');
      }
    });
  }

}
