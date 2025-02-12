const deleteMyProfile = (req, res) => {
  res.json({ msg: "Delete my profile" });
};
const updateMyProfile = (req, res) => {
  res.json({ msg: "Update my profile" });
};
module.exports = { deleteMyProfile, updateMyProfile };
