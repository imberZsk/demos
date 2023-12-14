const path = require('path')
const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')
let downloadGitRepo = require('download-git-repo')
const { promisify } = require('util')
downloadGitRepo = promisify(downloadGitRepo)
const { downloadDirectory } = require('./constants')
let ncp = require('ncp')
ncp = promisify(ncp)

// 获取仓库列表
const fetchRepoList = async () => {
  // 获取当前组织中的所有仓库信息，这个仓库中存放的都是项目模版
  const { data } = await axios.get(
    'https://api.github.com/orgs/imber-cli/repos'
  )
  return data
}

const wrapFetchAddLoading =
  (fn, message) =>
  async (...args) => {
    const spinner = ora(message)
    spinner.start() // 开始loading
    const result = await fn(...args)
    spinner.succeed() // 结束loading
    return result
  }

module.exports = async (projectName) => {
  // 1.获取模版
  let repos = await wrapFetchAddLoading(fetchRepoList, 'fetching tags ......')()
  // 选择模版
  repos = repos.map((item) => item.name)
  const { repo } = await Inquirer.prompt({
    name: 'repo', // 获取选择后的结果
    type: 'list', // 什么方式显示在命令行
    message: 'please choose a template to create project', // 提示信息
    choices: repos // 选择的数据
  })
  // 1.获取版本号
  const fetchTagList = async (repo) => {
    console.log(repo, '这是repo')
    const { data } = await axios.get(
      `https://api.github.com/repos/imber-cli/${repo}/tags`
    )
    return data
  }
  // 下载项目
  const download = async (repo, tag) => {
    let api = `imber-cli/${repo}` // 下载项目
    if (tag) {
      api += `#${tag}`
    }
    const dest = `${downloadDirectory}/${repo}` // 将模板下载到对应的目录中
    await downloadGitRepo(api, dest)
    return dest // 返回下载目录
  }
  // 2.获取对应的版本号
  let tags = await wrapFetchAddLoading(
    fetchTagList,
    'fetching tags ......'
  )(repo)
  tags = tags.map((item) => item.name)
  // 选择版本号
  const { tag } = await Inquirer.prompt({
    name: 'tag', // 获取选择后的结果
    type: 'list', // 什么方式显示在命令行
    message: 'please choose tags to create project', // 提示信息
    choices: tags // 选择的数据
  })
  // 3.下载项目 返回一个临时存放目录
  const result = await wrapFetchAddLoading(download, 'download template....')(
    repo,
    tag
  )
  await ncp(result, path.resolve(projectName)) // 将下过滤的文件复制到工件目录中
}
