<template>
    <v-app>
       <div class="s-fluid grey primary" >
          <v-row no-gutters >
      <v-col
        cols="12"
        sm="6"
        md="7"
      >
        <div
          class=""
          outlined
          tile
        >
        <v-carousel>
          <v-carousel-item
            v-for="slide in projects"
            :key="slide.id"
            :src="slide.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
      </v-carousel>

        </div>
      </v-col>
      <v-col
        cols="6"
        md="5"
      >
        <div
          class=""
          outlined
          tile
        >
          <div class="s-d-flex s-center s-space-around">
            <div class="h-200">
              <h1>Join a project near you</h1>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
        </div>

     <!--catagori-->
    <v-container class="grey lighten-5 s-mt-20">
    <v-row>
      <v-col
        cols="6"
        md="4"
      >
        <div
          class="s-center pa-2"
          outlined
          tile
        >
          <h1>Improve Your skills</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus in, corporis,
             maiores suscipit voluptas fugiat dolore sint reprehenderit ipsa
             consequatur tempora impedit voluptatum voluptate neque itaque modi tenetur nemo a.</p>
        </div>
      </v-col>
       <!---2nd col--->
       <v-col
        cols="6"
        md="4"
      >
        <div
          class="s-center pa-2"
          outlined
          tile
        >
          <h1>Improve Your skills</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus in, corporis,
             maiores suscipit voluptas fugiat dolore sint reprehenderit ipsa
             consequatur tempora impedit voluptatum voluptate neque itaque modi tenetur nemo a.</p>
        </div>
      </v-col>
      <!---3rd col--->
       <v-col
        cols="6"
        md="4"
      >
        <div
          class="s-center pa-2"
          outlined
          tile
        >
          <h1>Improve Your skills</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus in, corporis,
             maiores suscipit voluptas fugiat dolore sint reprehenderit ipsa
             consequatur tempora impedit voluptatum voluptate neque itaque modi tenetur nemo a.</p>
        </div>
      </v-col>
    </v-row>
   </v-container>
    </v-app>
</template>
<script>
export default {
  data: () => ({
    colors: [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4'
    ],
    projects: [
      { url: 'https://i.pinimg.com/originals/47/26/2f/47262f0a4daf10dcf02f1a12ac721ea4.jpg', title: 'Touchless 3s', id: '1' },
      { url: 'https://hackster.imgix.net/uploads/attachments/525278/_34C6GxtohL.2Q%3D%3D?auto=compress%2Cformat&w=400&h=300&fit=min', title: 'Tokio music box', id: '2' }
    ]
  })
}
</script>
