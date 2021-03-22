<template>
    <div class="list-component">
        <button class="logout" @click="logout">Log out <i class="fas fa-sign-out-alt"></i></button>
        <h2>List Of Users</h2>
        <table>
        <tr>
            <th class="center">ID</th>
            <th class="center">First Name</th>
            <th class="center">Last Name</th>
            <th class="center">Email</th>
            <th class="center">Avatar</th>
            <th class="center">Actions</th>
        </tr>
        <tr v-for="user in allUsers" :key="user.id">
            <td class="center">{{user.id}}</td>
            <td class="center">{{user.first_name}}</td>
            <td class="center">{{user.last_name}}</td>
            <td class="center">{{user.email}}</td>
            <td class="center"><img class="image" :src="user.avatar" alt="avatar"></td>
            <td class="center">
                <button class="action edit" @click="editModal(user)"><i class="fas fa-pen"></i></button>
                <button class="action delete" @click="deleteModal(user)"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
        </table>
        <div v-if="allUsers">
            <div class="pagination">
                <span v-for="i in pages" :key="i" @click="fetchAllItems(i)">
                <label v-if="i === page" class="active">{{i}}</label>
                <label v-else>{{i}}</label>
                </span>
            </div>
        </div>
        <div class="modal" v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                        Delete Confirmation
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                        Are You Sure To Delete {{userData.first_name}}?
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        <button class="modal-default-button action delete" @click="deleteUser(userData)">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="modal-default-button action edit" @click="showModal = false">
                            <i class="fas fa-times"></i>
                        </button>
                        </slot>
                    </div>
                    </div>
                </div>
                </div>
            </transition>
        </div>
        <div class="modal" v-if="showEditModal">
            <transition name="modal">
                <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                    <div class="modal-header edit-header">
                        <slot name="header">
                        Edit Confirmation
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <label>First Name</label>
                            <input class="input-group" placeholder="First Name" type="text" v-model="first_name">
                            <label>Last Name</label>
                            <input class="input-group" placeholder="Last Name" type="text" v-model="last_name">
                            <label>Email</label>
                            <input class="input-group" placeholder="Email" type="email" v-model="email">
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                        <button class="modal-default-button action edit" @click="updateUser()">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="modal-default-button action delete" @click="showEditModal = false">
                            <i class="fas fa-times"></i>
                        </button>
                        </slot>
                    </div>
                    </div>
                </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import { ServiceFactory } from "../services/ServiceFactory";
const service = ServiceFactory.get("users");
export default {
    data() {
    return {
        allUsers: [],
        options: {},
        total_pages: null,
        total: null,
        per_page: 6,
        page: 1,
        pages: [],
        showModal: false,
        showEditModal: false,
        editedIndex: -1,
        userData: null,
        first_name: "",
        last_name: "",
        email: ""
    }
    },
    computed: {
        formTitle () {
        return this.editedIndex === -1
      },
    },
    created() {
        this.fetchAllItems().then(()=>this.paginate())
    },
    methods: {
        editModal(user) {
            this.showEditModal = true
            this.userData = user
            this.first_name = user.first_name
            this.last_name = user.last_name
            this.email = user.email
        },
        deleteModal(user) {
            this.showModal = true
            this.editedIndex = this.allUsers.indexOf(user)
            this.userData = user
        },
        logout() {
            this.$store.commit('logout')
        },
        async fetchAllItems(page) {
            if (page) {
                this.page = page
            }
            const data = await service.getAllUsers(this.page);
            this.allUsers = data.data.data
            this.total_pages = data.data.total_pages
            this.total = data.data.total
            this.per_page = data.data.per_page
            this.page = data.data.page
        },
        paginate () {
            for (let index = 1; index <= this.total_pages; index++) {
				this.pages.push(index);
			}
        },
        async deleteUser(userData) {
            const deleteUser = await service.deleteUser(userData.id);
            console.log("deleteUser", deleteUser)
            this.allUsers.splice(userData, 1)
            this.closeDelete()
        },
        closeDelete () {
            this.showModal = false
            this.$nextTick(() => {
            this.userData = Object.assign({}, this.userData)
            this.editedIndex = -1
        })
      },
        async updateUser() {
            const userData = {
                "first_name": this.first_name,
                "last_name": this.last_name,
                "email": this.email
            }
            const updateUser = await service.updateUser(this.userData.id, userData);
            if (updateUser) {
                this.allUsers.filter(item => {
                    if (this.userData.id === item.id) {
                        item.first_name = this.first_name
                        item.last_name = this.last_name
                        item.email = this.email
                        this.showEditModal = false
                    }
                })
            }
        }
    }
}
</script>