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

#malnut{
  [total <= 3] {polygon-fill:@1;}
  [total > 3][total <= 5] {polygon-fill:@2;}
  [total > 5][total <= 7] {polygon-fill:@3;}
  [total > 7][total <= 9] {polygon-fill:@5;}
  [total > 9][total <= 11] {polygon-fill:@7;}
  [total > 11] {polygon-fill:@9;}
}