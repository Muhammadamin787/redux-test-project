import { describe, expect, it } from "vitest";
import postSlice, { initialState, setAddPost, setClosePostsModal, setDeletePostFromCache, setPostSearch, setPosts } from "../../../../app/features/post/postSlice";
import { fakePost, fakePost2 } from "../../FakeData";


describe("Post slice", () => {

     describe("Post modal", () => {

          it("initial state", () => {
               const state = postSlice(undefined, { type: "unknown" })
               expect(state).toEqual(initialState)
          })

          it("setPosts", () => {
               const posts = [fakePost, fakePost2]
               const state = postSlice(initialState, setPosts(posts))

               expect(state.posts).toEqual(expect.arrayContaining(posts))
          })

          it("setPostSearch", () => {
               const key = "postname"
               const state = postSlice(initialState, setPostSearch(key))

               expect(state.search).toBe(key)
          })

          it("setDeletePostFromCache", () => {
               const stateWithPosts = postSlice(initialState, setPosts([fakePost, fakePost2]))
               const state = postSlice(stateWithPosts, setDeletePostFromCache(fakePost.id))
               const state2 = postSlice(stateWithPosts, setDeletePostFromCache(3))

               expect(state.posts).toEqual([fakePost2])
               expect(state2.posts).toEqual([fakePost, fakePost2])
          })
     })

     describe("Post modal", () => {

          it("setAddPost", () => {
               const stateWithPosts = {
                    ...initialState,
                    posts: [fakePost, fakePost]
               }
               const state = postSlice(stateWithPosts, setAddPost(fakePost2))
               const id = stateWithPosts.posts[0].id + 1
               const post = { ...fakePost2, id }

               expect(state.posts[0]).toEqual(post)
          })

          it("setClosePostsModal", () => {
               const stateWithModal: (typeof initialState) = {
                    ...initialState,
                    postsModal: {
                         isOpen: true,
                         post: fakePost
                    }
               }

               const state = postSlice(stateWithModal, setClosePostsModal())
               const state2 = postSlice(stateWithModal, setClosePostsModal({ clear: true }))

               expect(state.postsModal).toEqual({ ...stateWithModal.postsModal, isOpen: false })
               expect(state2.postsModal).toEqual({ isOpen: false })
          })
     })
})
