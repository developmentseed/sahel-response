@black_trans:rgba(0,0,0,0.2);
@black:rgb(0,0,0);

#admin_lv3 {
  line-color:@black;
  polygon-fill:@black_trans;
  [zoom = 4] {line-width:0.2;}
  [zoom = 5] {line-width:0.3;}
  [zoom > 5] {line-width:0.5;}
}