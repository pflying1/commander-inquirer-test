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
  .option("-f, --fileName <fileName>", "파일 이름")
  .option("-t, --titleContent <titleContent>", "타이틀 내용")
  .option("-ta, --tagName <tagName>", "태그 이름")
  .option("-attriName, --attriName <attriName>", "속성 이름")
  .option("-attriValue, --attriValue <attriValue>", "속성 값")
  .option("-pContent, --pContent <pContent>", "p태그 내용")

  .parse(process.argv);

if (!program.fileName || !program.titleContent) {
  const questions = [];

  //questions 배열안에 적혀질 내용 질문 부분
  if (!program.fileName) {
    questions.push({
      type: "input",
      name: "fileName",
      message: "HTML 파일 이름 : ",
    });
  }

  if (!program.titleContent) {
    questions.push({
      type: "input",
      name: "titleContent",
      message: "타이틀에 들어갈 내용 : ",
    });
  }

  //file name과 titleContent를 하나의 객체로 묶어줌
  //assign 은 객체의 속성들을 복사함
  //opts는 프로퍼티를 가져옴
  inquirer.prompt(questions).then((answers) => {
    const { fileName, titleContent } = Object.assign(program.opts(), answers);

    console.log(`HTML 파일 이름 :  ${fileName}.`);
    console.log(`title 내용 :  ${titleContent}.`);
    console.log(fileName);

    //파일 내용
    const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>${titleContent}</title>
    </head>
    <body>
    </body>
    </html>
    `;

    //파일 생성, 경로
    fs.writeFileSync(`./result/${fileName}.html`, html, (err) => {
      if (err) {
        console.log("에러 발생");
      } else {
        console.log("파일이 생성되었습니다.");
      }
    });
  });
} else {
  const { fileName, titleContent } = program;

  console.log(`HTML 파일 이름 :  ${fileName}.`);
  console.log(`title 내용 :  ${titleContent}.`);
}
