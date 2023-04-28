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
  .option('-f, --filename <filename>', '파일 이름')
  .option('-c, --content <content>', '파일 내용')
  .parse(process.argv);

if (!program.filename || !program.content ) {
  const questions = [];

  if (!program.name) {
    questions.push({
      type: 'input',
      name: 'filename',
      message: 'HTML 파일 이름을 적어주세요.'
    });
  }

  inquirer.prompt(questions).then((answers) => {
    const { filename } = Object.assign(program.opts(), answers);

    console.log(`HTML 파일 이름 :  ${filename}.`);
    console.log(questions)
  });
} else {
  const { filename } = program;

  console.log(`HTML파일 이름은 ${filename}입니다.`);
}