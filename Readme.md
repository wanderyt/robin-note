# robin-note

Note board for little robin

## Folder structure

### Project folder

```
|- .story [Storybook configuration folder]
|- server [Server side code folder]
|- src    [Client side code folder]
```

### Server folder

```
|- helper           [common helper code]
|- ins              [ins server code]
  |- helper         [ins internal helper code]
  |- config         [ins internal configuration json]
  |- middleware     [middleware code]
  |- router         [router code]
|- wacai            [wacai server code]
```

### Client folder

```
|- scripts                [javascript code]
  |- components           [common components code]
  |- page                 [page level code]
    |- {page-name}
      |- {component-name} [components consumed by parent page]
  |- uikit                [common ui kit code]
  |- reducers             [TBD: redux reduces code]
  |- services             [TBD: mock services code]
|- styles                 [common styles code, fonts, images]
```

## Functions

### Server

Default server port: __localhost:5000__

#### Instagram

##### Login (In progress)

Instagram login via username / password or facebook.

> /api/ins/login

##### Search User

Search related users with search string param.

> /api/ins/searchUser?searchString={searchString}

##### Search Image by Text

Search related images with search text param.

> /api/ins/searchUser?searchText={searchText}

##### Get all images by User Id

Search all images related with specific user.

> /api/ins/images?id={id}offset={offset = 20}nextTimeHash={nextTimeHash}

##### Download image

Search all images related with specific user.

> /api/ins/downloadImage?img={imageUrl}id={id}type={twitter | ins}insName={insUserName}

#### Wacai

url prefix:

`/api/wacai`: need token set in cookies, and then request could be valid.

`/api/proxy/wacai`: automatically fetch token via login middleware, and then perform following actions.

##### Login

Wacai user login.

> /api/wacai/login

##### Load data

Load all wacai data by specific time range.

Save related data as json file in `/server/wacai/files` named as time range definition.

Search file first, if not matched, then fetch data from wacai server.

> /api/proxy/wacai/loadData?fromDate={fromDate = 20181010T12:00:00}&toDate={toDate = 20181011T12:00:00}

### Client

Default client port: __localhost:3000__

#### Pages

Client pages.

##### Chinese

Page for Robin to learn chinese word.

> localhost:3000/chinese

##### Colors

Page for color dashboard.

> localhost:3000/colors

##### Finance

Page for wacai dashboard, including statistic display.

> localhost:3000/finance

##### Instagram

Page for instagram images display.

> localhost:3000/instagram

##### Paint

Page for twitter images display, with lazy load testing.

> localhost:3000/paint

##### Number

Page for math learning.

> localhost:3000/number

## Fonts

### MERRIWEATHER

Download link: https://www.fontsquirrel.com/fonts/merriweather

Inspired by: [Dan Abramov - The Elements of UI Engineering](http://pop.frontendweekly.co/TFDWyR?utm_campaign=Frontend%2BWeekly&utm_medium=email&utm_source=Frontend_Weekly_135)


