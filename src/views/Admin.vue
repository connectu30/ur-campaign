<template>
    <v-app>
        <v-toolbar>
            <v-spacer/>
            <v-toolbar-title>
                컨텐츠 등록
            </v-toolbar-title>
            <v-spacer/>
        </v-toolbar>
        <v-container grid-list-xl fluid style="border: 2px solid black;">
            <v-layout wrap style="border: 2px solid blue;">
                <v-flex md6 xs12>
                    <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field v-model="content.name" label="컨텐츠명"> </v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-menu
                                :close-on-content-click="false"
                                v-model="date_picker"
                                :nudge-right="40"
                                lazy
                                transition="scale-transition"
                                offset-y
                                full-width
                                max-width="290px"
                                min-width="290px"
                                >
                                <v-text-field
                                    slot="activator"
                                    v-model="picker"
                                    label="날짜"
                                    readonly
                                ></v-text-field>
                                <v-date-picker
                                    v-model="picker"
                                    no-title
                                    @input="date_picker = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md6 xs12>
                    <v-textarea v-model="content.summary" label="컨텐츠 요약"> </v-textarea>
                </v-flex>
                <v-flex xs6 d-flex>
                    <v-subheader> 컨텐츠 종류 </v-subheader>
                    <div v-for="type in types" :key="type.name">
                        <v-checkbox :label="type.name" v-model="type.value">
                        </v-checkbox>
                    </div>
                </v-flex>
                <v-flex xs12 v-if="types[0].value == true">
                    <input type="file" multiple accept="image/*" @change="onChange"/>
                    <div v-for=" img in images" :key="img">
                        <v-img :src="img" />
                    </div>
                </v-flex>
                <v-flex xs12 v-if="types[1].value == true">
                    <v-text-field v-model="content.url" label="비디오 URL">
                    </v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn @click="upload"> 올리기 </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
import { db } from '@/plugins/firebase'

export default {
    name: 'admin',
    data () {
        return {
            index: null,
            types: [ { name: 'photos', value: false }, { name: 'videos', value: false }, { name: 'maps', value: false } ],
            picker: new Date().toISOString().substring(0, 10),
            date_picker: false,
            content: { name: null, summary: null, date: null, type: [], url: null },
            doc: [],
            imageURLs: [],
            images: []
        }
    },
    firestore: {
        doc: db.collection('campaigns').doc('univ_0').collection('contents')
    },
    methods: {
        upload() {
            this.index = 'cont_' + this.doc.length.toString()
            this.content.date = new Date(this.picker)
            db.collection('campaigns').doc('univ_0').collection('contents').doc(this.index).set(this.content)
        },
        onChange(event) {
            let selectedFiles = event.target.files
            this.imageURLs = []
            this.images = []
            for (var i = 0; i < selectedFiles.length; i++) {
                this.imageURLs.push(selectedFiles[i])
            }
            for (var i = 0; i < this.imageURLs.length; i++) {
                let reader = new FileReader()
                reader.addEventListener('load', () => {
                    this.images.push(reader.result)
                })
                reader.readAsDataURL(selectedFiles[i])
            }
        }
    }
}
</script>