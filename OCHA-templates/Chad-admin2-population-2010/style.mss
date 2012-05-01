@0:rgb(0,0,0);
@1:rgba(0,0,0,0.1);
@2:rgba(0,0,0,0.2);
@3:rgba(0,0,0,0.3);
@4:rgba(0,0,0,0.4);
@5:rgba(0,0,0,0.5);
@6:rgba(0,0,0,0.6);
@7:rgba(0,0,0,0.7);
@8:rgba(0,0,0,0.8);
@9:rgba(0,0,0,0.9);
@red:rgb(255,0,0);

#admin-pop {
  [total <= 10000] {polygon-fill:@1;}
  [total > 10000][total <= 60000] {polygon-fill:@2;}
  [total > 60000][total <= 110000] {polygon-fill:@3;}
  [total > 110000][total <= 160000] {polygon-fill:@4;}
  [total > 160000][total <= 210000] {polygon-fill:@5;}
  [total > 210000][total <= 260000] {polygon-fill:@6;}
  [total > 260000][total <= 310000] {polygon-fill:@7;}
  [total > 310000][total <= 360000] {polygon-fill:@8;}
  [total > 360000] {polygon-fill:@9;}
  [total > 800000] {polygon-fill:@red;}
}