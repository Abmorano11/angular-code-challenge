import { ActivatedRoute, Router, convertToParamMap } from "@angular/router";
import { UserDetailsComponent } from "./user-details.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule, routes } from "../app.module"
import { Observable, of, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { UserData } from "src/model/user-data";

describe('UserDetailsComponent Standard State', () => {
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let fixture: ComponentFixture<UserDetailsComponent>;
    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [ UserDetailsComponent ],
            imports: [
                AppModule,
                RouterTestingModule.withRoutes(routes),
            ],
            providers:
            [
              {
                provide: ActivatedRoute,
                useValue: {
                  snapshot: {
                    paramMap: convertToParamMap({
                        id: '0'
                    })
                  }
                }
              },
              {
                provide: UserService,
                useValue: {
                    findOneById: (id: number) => {
                        return of<UserData>({
                            id: 0,
                            name: 'Alice',
                            bio: `
                        **Welcome to my profile!**
                        
                        [Here](https://www.github.com/) is my website.
                            `,
                            profilePicture: '/assets/img/chicken.jpg'
                          })
                    }
                }
              },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailsComponent);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
    });
    it('Should have Id ', () => {
        const comp = fixture.componentInstance;
        expect(comp.id).toEqual(0);
    });
    it('Should have UserData ', () => {
        const comp = fixture.componentInstance;
        comp.ngOnInit();
        expect(comp.user.name).not.toBeUndefined();
    });
});

describe('UserDetailsComponent Fail State', () => {
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let fixture: ComponentFixture<UserDetailsComponent>;
    let userService: UserService;
    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [ UserDetailsComponent ],
            imports: [
                AppModule,
                RouterTestingModule.withRoutes(routes),
            ],
            providers:
            [
            {
                provide: ActivatedRoute,
                useValue: {
                snapshot: {
                    paramMap: convertToParamMap({
                        id: '2'
                    })
                }
                }
            },
            {
                provide: UserService,
                useValue: {
                    findOneById: (id: number) => {
                        return of()
                    }
                }
            },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UserDetailsComponent);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        userService = TestBed.inject(UserService);
    });
    it('Should redirect', () => {
        const comp = fixture.componentInstance;
        const navigateSpy = spyOn(router, 'navigateByUrl');
        const dataSpy = spyOn(userService , 'findOneById').and.returnValue(throwError(() => new Error('test')));
        comp.ngOnInit();
        expect(navigateSpy).toHaveBeenCalledWith('');
    });
    it('Should not have UserData ', () => {
        const comp = fixture.componentInstance;
        comp.ngOnInit();
        expect(comp.user.name).toBeUndefined();
    });
});