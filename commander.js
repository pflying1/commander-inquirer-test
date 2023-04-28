import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";

/*
 * cli 상에서 해야하는 질문
 * 1. HTML 이름
 * 2. title 내용
 * 3. body 자식으로 생성되는 tag 이름
 * 4. 3번에서 생성된 setAttribute 즉 속성 이름, 속성 값 2가지
 * 5. <p>태그 안의 내용
 *
 */
program
  .option("-f, --filename <filename>", "파일 이름")
  .option("-t, --titlecontent <titlecontent>", "타이틀 내용")
  .parse(process.argv);

if (!program.filename || !program.titlecontent) {
  const questions = [];

  if (!program.filename) {
    questions.push({
      type: "input",
      name: "filename",
      message: "HTML 파일 이름 : ",
    });
  }

  if (!program.titlecontent) {
    questions.push({
      type: "input",
      name: "titlecontent",
      message: "타이틀에 들어갈 내용 : ",
    });
  }

  inquirer.prompt(questions).then((answers) => {
    const { filename, titlecontent } = Object.assign(program.opts(), answers);

    console.log(`HTML 파일 이름 :  ${filename}.`);
    console.log(`title 내용 :  ${titlecontent}.`);
    console.log(filename);
    console.log(titlecontent);

    //파일 생성 구문

    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>${titlecontent}</title>
    </head>
    <body>
    </body>
    </html>
    `;

    fs.writeFileSync(`./result/${filename}.html`, html, (err) => {
      if (err) {
        console.log("에러 발생");
      } else {
        console.log("파일이 생성되었습니다.");
      }
    });
  });
} else {
  const { filename, titlecontent } = program;

  console.log(`HTML 파일 이름 :  ${filename}.`);
  console.log(`title 내용 :  ${titlecontent}.`);
}
