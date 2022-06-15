<template>
  <div class="home" style="padding: 16px;">

      <img alt="Vue logo" src="https://assets-global.website-files.com/5fcd915fc5fd297945b33517/600c8f70c5671b401a01be21_hs-logo.svg" style="margin-bottom: 16px">
      <br>

      <div @click="getCandidates()" style="padding: 8px; border-radius: 5px; border:1px solid black; display: inline; cursor:pointer;">
          Get Candidates
      </div>
      <br>

      <!-- candidates -->
      <div style="display: inline-block; text-align: initial">
          <div v-for="candidate in candidates" style="padding: 16px; max-width: 600px;" >

              <div style="font-weight: bold; font-size: 20px; margin-bottom: 4px; margin-left: 8px">
                  {{ candidate.name }}
              </div>

              <div style="padding: 8px">

                  <div v-if="candidate.experienceArr.length > 0">
                      <div v-for="experience in candidate.experienceArr" >
                          <div v-html="experience.getFormat()"> </div>
                      </div>
                  </div>
                  <div v-else>
                      None
                  </div>
              </div>
          </div>

      </div>



  </div>
</template>

<script>
// @ is an alias to /src
import {getCandidates} from "@/Services/server";

export default {
    name: 'Home',
    data(){
        return {
            candidates : []
        }
    },
    methods:{
        getCandidates(){
            getCandidates().then((candidates => {
                this.candidates = candidates
            }))
        }
    },
}
</script>

