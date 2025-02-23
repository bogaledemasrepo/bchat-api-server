module.exports = async (req, res, next) => {
  console.log(req.body.formData());
  //   const file = body.tubnail;
  // if (!file) throw new Error("tubnail not found");
  // const { success, path } = await uploadFile(file, body.title as string);
  // if (!success) throw new Error("Image upload fild");

  // const newProject = new Projects({
  //   title: body.title,
  //   discription: body.discription,
  //   tubnail: path,
  //   sourceCode: body.sourceCode,
  //   previewlink: body.previewlink,
  // });
  // try {
  //   const resualt = await newProject.save();
  //   return { success: false, data: resualt };
  // } catch (error) {
  //   console.log(error);
  //   return { success: false, data: [] };
  // }
  next();
};
