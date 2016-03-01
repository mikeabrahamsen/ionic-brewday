import {Page, NavController} from 'ionic-framework/ionic';
import { Http, Headers, HTTP_PROVIDERS } from 'angular2/http';

@Page({
  templateUrl: 'build/pages/recipes/additions/additions.html'
})
export class Additions{
  static get parameters(){
    return [[Http], [NavController]];
  }
  constructor(http, nav) {
    this.http = http;
    this.nav = nav;
    this.grainList = [
        {id: 0, region: 'American', name: 'Aromatic Malt'},
        {id: 1, region: 'American', name: 'Ashbourne Mild'},
        {id: 2, region: 'American', name: 'Black Barley'},
        {id: 3, region: 'American', name: 'Black Malt'},
        {id: 4, region: 'American', name: 'Blackprinz'},
        {id: 5, region: 'American', name: 'Bonlander Munich'},
        {id: 6, region: 'American', name: 'CaraBrown'},
        {id: 7, region: 'American', name: 'CaraCrystal Wheat Malt'},
        {id: 8, region: 'American', name: 'Caramel / Crystal 10L'},
        {id: 9, region: 'American', name: 'Caramel / Crystal 15L'},
        {id: 10, region: 'American', name: 'Caramel / Crystal 20L'},
        {id: 11, region: 'American', name: 'Caramel / Crystal 30L'},
        {id: 12, region: 'American', name: 'Caramel / Crystal 40L'},
        {id: 13, region: 'American', name: 'Caramel / Crystal 60L'},
        {id: 14, region: 'American', name: 'Caramel / Crystal 75L'},
        {id: 15, region: 'American', name: 'Caramel / Crystal 80L'},
        {id: 16, region: 'American', name: 'Caramel / Crystal 90L'},
        {id: 17, region: 'American', name: 'Caramel / Crystal 120L'},
        {id: 18, region: 'American', name: 'Caramel / Crystal 150L'},
        {id: 19, region: 'American', name: 'Carapils {Dextrine Malt}'},
        {id: 20, region: 'American', name: 'Chocolate'},
        {id: 21, region: 'American', name: 'Dark Chocolate'},
        {id: 22, region: 'American', name: 'Midnight Wheat Malt'},
        {id: 23, region: 'American', name: 'Munich Light 10L'},
        {id: 24, region: 'American', name: 'Munich Dark 20L'},
        {id: 25, region: 'American', name: 'Munich 60L'},
        {id: 26, region: 'American', name: 'Pale 2-Row'},
        {id: 27, region: 'American', name: 'Pale 2-Row Toasted'},
        {id: 28, region: 'American', name: 'Pale 6-Row'},
        {id: 29, region: 'American', name: 'Pale Ale'},
        {id: 30, region: 'American', name: 'Pilsner'},
        {id: 31, region: 'American', name: 'Red Wheat'},
        {id: 32, region: 'American', name: 'Roasted Barley'},
        {id: 33, region: 'American', name: 'Rye'},
        {id: 34, region: 'American', name: 'Smoked Malt'},
        {id: 35, region: 'American', name: 'Special Roast'},
        {id: 36, region: 'American', name: 'Victory'},
        {id: 37, region: 'American', name: 'Vienna'},
        {id: 38, region: 'American', name: 'Wheat'},
        {id: 39, region: 'American', name: 'White Wheat'},
        {id: 40, region: 'Belgian', name: 'Aromatic'},
        {id: 41, region: 'Belgian', name: 'Biscuit'},
        {id: 42, region: 'Belgian', name: 'Cara 20L'},
        {id: 43, region: 'Belgian', name: 'Cara 45L'},
        {id: 44, region: 'Belgian', name: 'Caramel Pils'},
        {id: 45, region: 'Belgian', name: 'CaraMunich'},
        {id: 46, region: 'Belgian', name: 'CaraVienne'},
        {id: 47, region: 'Belgian', name: 'Chocolate'},
        {id: 48, region: 'Belgian', name: 'De-Bittered Black'},
        {id: 49, region: 'Belgian', name: 'Munich'},
        {id: 50, region: 'Belgian', name: 'Pale Ale'},
        {id: 51, region: 'Belgian', name: 'Pilsner'},
        {id: 52, region: 'Belgian', name: 'Roasted Barley'},
        {id: 53, region: 'Belgian', name: 'Special B'},
        {id: 54, region: 'Belgian', name: 'Unmalted Wheat'},
        {id: 55, region: 'Belgian', name: 'Wheat'},
        {id: 56, region: 'Canadian',name:  'ESB Malt'},
        {id: 57, region: 'Canadian',name:  'Honey Malt'},
        {id: 58, region: 'Canadian',name:  'Munich Dark'},
        {id: 59, region: 'Canadian',name:  'Munich Light'},
        {id: 60, region: 'Canadian',name:  'Pale 2-Row'},
        {id: 61, region: 'Canadian',name:  'Pale Wheat'},
        {id: 62, region: 'German', name: 'Abbey Malt'},
        {id: 63, region: 'German', name: 'Acidulated Malt'},
        {id: 64, region: 'German', name: 'Bohemian Pilsner'},
        {id: 65, region: 'German', name: 'CaraAmber'},
        {id: 66, region: 'German', name: 'CaraAroma'},
        {id: 67, region: 'German', name: 'CaraBelge'},
        {id: 68, region: 'German', name: 'CaraBohemian'},
        {id: 69, region: 'German', name: 'Carafa I'},
        {id: 70, region: 'German', name: 'Carafa II'},
        {id: 71, region: 'German', name: 'Carafa III'},
        {id: 72, region: 'German', name: 'CaraFoam'},
        {id: 73, region: 'German', name: 'CaraHell'},
        {id: 74, region: 'German', name: 'Caramel Pils'},
        {id: 75, region: 'German', name: 'Caramel Wheat'},
        {id: 76, region: 'German', name: 'CaraMunich I'},
        {id: 77, region: 'German', name: 'CaraMunich II'},
        {id: 78, region: 'German', name: 'CaraMunich III'},
        {id: 79, region: 'German', name: 'Carapils'},
        {id: 80, region: 'German', name: 'CaraRed'},
        {id: 81, region: 'German', name: 'Chocolate Rye'},
        {id: 82, region: 'German', name: 'Chocolate Wheat'},
        {id: 83, region: 'German', name: 'Dark Munich'},
        {id: 84, region: 'German', name: 'Dark Wheat'},
        {id: 85, region: 'German', name: 'De-Husked Caraf I'},
        {id: 86, region: 'German', name: 'De-Husked Caraf II'},
        {id: 87, region: 'German', name: 'De-Husked Caraf III'},
        {id: 88, region: 'German', name: 'Floor-Malted Bohemian Pilsner'},
        {id: 89, region: 'German', name: 'Floor-Malted Bohemian Pilsner Dk'},
        {id: 90, region: 'German', name: 'Floor-Malted Bohemian Wheat'},
        {id: 91, region: 'German', name: 'Kolsch'},
        {id: 92, region: 'German', name: 'Melanoidin'},
        {id: 93, region: 'German', name: 'Munich Dark'},
        {id: 94, region: 'German', name: 'Munich Light'},
        {id: 95, region: 'German', name: 'Pale Ale'},
        {id: 96, region: 'German', name: 'Pale Wheat'},
        {id: 97, region: 'German', name: 'Pilsner'},
        {id: 98, region: 'German', name: 'Rye'},
        {id: 99, region: 'German', name: 'Smoked Malt'},
        {id: 100,region:  'German',name:  'Spelt Malt'},
        {id: 101,region:  'German',name:  'Vienna'},
        {id: 102,region:  'German',name:  'Wheat Malt'},
        {id: 103,region:  'United Kingdom', name: 'Amber'},
        {id: 104,region:  'United Kingdom', name: 'Black Patent'},
        {id: 105,region:  'United Kingdom', name: 'Brown'},
        {id: 106,region:  'United Kingdom', name: 'Cara Malt'},
        {id: 107,region:  'United Kingdom', name: 'Carastan {30/37}'},
        {id: 108,region:  'United Kingdom', name: 'Carastan Light {15L}'},
        {id: 109,region:  'United Kingdom', name: 'Chocolate'},
        {id: 110,region:  'United Kingdom', name: 'Coffee Malt'},
        {id: 111,region:  'United Kingdom', name: 'Crystal 15L'},
        {id: 112,region:  'United Kingdom', name: 'Crystal 30L'},
        {id: 113,region:  'United Kingdom', name: 'Crystal 45L'},
        {id: 114,region:  'United Kingdom', name: 'Crystal 50L'},
        {id: 115,region:  'United Kingdom', name: 'Crystal 60L'},
        {id: 116,region:  'United Kingdom', name: 'Crystal 70L'},
        {id: 117,region:  'United Kingdom', name: 'Crystal 90L'},
        {id: 118,region:  'United Kingdom', name: 'Crystal 140L'},
        {id: 119,region:  'United Kingdom', name: 'Crystal Rye'},
        {id: 120,region:  'United Kingdom', name: 'Dextrine Malt'},
        {id: 121,region:  'United Kingdom', name: 'Dark Crystal 80L'},
        {id: 122,region:  'United Kingdom', name: 'Extra Dark Crystal 120L'},
        {id: 123,region:  'United Kingdom', name: 'Extra Dark Crystal 160L'},
        {id: 124,region:  'United Kingdom', name: 'Golden Naked Oats'},
        {id: 125,region:  'United Kingdom', name: 'Golden Promise'},
        {id: 126,region:  'United Kingdom', name: 'Halcyon'},
        {id: 127,region:  'United Kingdom', name: 'Lager'},
        {id: 128,region:  'United Kingdom', name: 'Malted Naked Oats'},
        {id: 129,region:  'United Kingdom', name: 'Maris Otter Pale'},
        {id: 130,region:  'United Kingdom', name: 'Mild'},
        {id: 131,region:  'United Kingdom', name: 'Munich'},
        {id: 132,region:  'United Kingdom', name: 'Oat Malt'},
        {id: 133,region:  'United Kingdom', name: 'Optic'},
        {id: 134,region:  'United Kingdom', name: 'Pale 2-Row'},
        {id: 135,region:  'United Kingdom', name: 'Pale Chocolate'},
        {id: 136,region:  'United Kingdom', name: 'Pearl'},
        {id: 137,region:  'United Kingdom', name: 'Peated Malt'},
        {id: 138,region:  'United Kingdom', name: 'Pilsen'},
        {id: 139,region:  'United Kingdom', name: 'Roasted Barley'},
        {id: 140,region:  'United Kingdom', name: 'Wheat'}]

  }
}