import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@Components/components/navigation';
import {
  compactSideBarItems,
  futuristicSideBarItems,
  horizontalSideBarItems,
  SideBarItems,
} from 'app/core/navigation/SideBarItems';
import { cloneDeep } from 'lodash-es';
import { Navigation } from 'app/core/navigation/navigation.types';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  navigation: Navigation;
  private readonly _defaultNavigation: FuseNavigationItem[] = SideBarItems;
  private readonly _compactNavigation: FuseNavigationItem[] =
    compactSideBarItems;
  private readonly _futuristicNavigation: FuseNavigationItem[] =
    futuristicSideBarItems;
  private readonly _horizontalNavigation: FuseNavigationItem[] =
    horizontalSideBarItems;

  async initialize(): Promise<Navigation> {
    this._compactNavigation.forEach((compactNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === compactNavItem.id) {
          compactNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });

    // Fill futuristic navigation children using the default navigation
    this._futuristicNavigation.forEach((futuristicNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === futuristicNavItem.id) {
          futuristicNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });

    // Fill horizontal navigation children using the default navigation
    this._horizontalNavigation.forEach((horizontalNavItem) => {
      this._defaultNavigation.forEach((defaultNavItem) => {
        if (defaultNavItem.id === horizontalNavItem.id) {
          horizontalNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });
    this.navigation = {
      default: this._defaultNavigation,
      compact: this._compactNavigation,
      futuristic: this._futuristicNavigation,
      horizontal: this._horizontalNavigation,
    };
    return this.navigation;
  }
  constructor() {}
}
