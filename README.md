# salesApp

## A Brief Explaination

This is a Sales Application was developed by Jóhann Þorvaldsson, Kári Eiríksson and Lúðvík Kemp using Angular 2.

1. Users should be able to see a list of sellers
2. Users can create new sellers and edit current sellers
3. Users can see a list of products of a certain seller
4. Users can see a top 10 list of their products
5. Users can create new products and edit current products

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)
```bash
npm install -g @angular/cli
```

## ng-bootstrap setup
### This is done inside the sales directory
```bash
npm install bootstrap@4.0.0-alpha.6 --save
npm install --save @ng-bootstrap/ng-boostrap
```

## toastr setup
```bash
npm install ng2-toastr --save
```

## To Setup the Server
### Run the following command inside the server_API directory
```bash
node index.js
```

## To Run the Application
```bash
ng serve
```

## To Run unit tests
```bash
ng test
or
ng test --code--coverage
```


