# YouTube Clone - Feature TODO

## Comment Edit/Delete Feature
- [x] Backend edit/delete controllers & routes already exist with auth
- [x] CommentItem.jsx: Edit/Delete menu only for the comment author
- [x] CommentSection.jsx: handleEditComment / handleDeleteComment wired up
- [x] Fix add-comment "Internal server error" (User model name mismatch: "user" -> "User")
- [x] Delete confirmation popup modal (replaced window.confirm)
- [ ] Test comment edit/delete flows

## Header Profile Dropdown Feature
- [x] Understand Header.jsx, routing (/channel), CreateChannelModal, hasChannel logic
- [x] Add profile dropdown on hover of the header avatar:
  - Show username
  - View your channel (if hasChannel)
  - Create channel (if !hasChannel)
  - Sign out
- [x] Removed unused CiLogout / CgProfile imports
- [ ] Test hover dropdown when logged in (with and without a channel)
