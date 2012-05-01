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
@red:rgb(255,0,0   );

#admin-pop {
  [total <= 100000] {polygon-fill:@1;}
  [total > 100000][total <= 600000] {polygon-fill:@2;}
  [total > 600000][total <= 1100000] {polygon-fill:@3;}
  [total > 1100000][total <= 1600000] {polygon-fill:@6;}
  [total > 1600000][total <= 2100000] {polygon-fill:@7;}
  [total > 2100000][total <= 2600000] {polygon-fill:@8;}
  [total > 2600000] {polygon-fill:@9;}
}

