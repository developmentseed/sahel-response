@black_trans:rgba(0,0,0,0.2);
@white_trans:rgba(255,255,255,0.2);
@black:rgb(0,0,0);
@white:rgb(255,255,255);
@transparent:rgba(0,0,0,0);

/*white */

/*#admin_lv2 {
  line-color:@white;
  line-width:1;
  polygon-fill:@white_trans;
}
#populated {
  marker-line-color:@white;
  marker-line-width:0.6;
  marker-height:2;
  marker-fill:@white_trans;
}
*

/*black*/


#admin_lv1 {
  line-color:@black;
  line-width:0.5;
  polygon-fill:@black_trans;
}



#admin_lv2 {
  line-color:@black;
  line-width:0.5;
  polygon-fill:@black_trans;
}


#admin_lv3 {
  line-color:@black;
  line-width:0.5;
  polygon-fill:@black_trans;
}


#populated {
  marker-line-color:lighten(@black,20%);
  marker-line-width:0.8;
  marker-fill:@transparent;
  [zoom = 4] {marker-height:1;}
  [zoom = 5] {marker-height:1.5;}
  [zoom > 5] {marker-height:2;}
}
