import * as core from '@actions/core'
import type { AxiosProxyConfig } from 'axios'
import sanitizeHtml from 'sanitize-html'
import markdownToTxt from 'markdown-to-txt'

export const REQUIRED_FIELDS = [
  'base-url',
  'url',
  'token',
  'summary',
  'description',
  'project-id',
  'category-id'
]

export const _checkRequiredFields = (REQUIRED_FIELDS: string[]): void => {
  for (const requiredField of REQUIRED_FIELDS) {
    if (['', 'null'].includes(core.getInput(requiredField))) {
      throw new Error(`Some required field is not set. [${requiredField}]`)
    }
  }
}

export const _getAxiosProxySettings = (): { proxy: AxiosProxyConfig } | {} => {
  const proxyConfig = {}
  if (core.getInput('proxy-type') !== 'null') {
    ;(proxyConfig as AxiosProxyConfig).protocol = core.getInput('proxy-type')
    ;(proxyConfig as AxiosProxyConfig).host = core.getInput('proxy-host')
    ;(proxyConfig as AxiosProxyConfig).port = parseInt(
      core.getInput('proxy-port')
    )
    if (core.getInput('proxy-username') !== 'null') {
      ;(proxyConfig as AxiosProxyConfig).auth = {
        username: core.getInput('proxy-username'),
        password: core.getInput('proxy-password')
      }
    }
    return { proxy: proxyConfig }
  } else {
    return {}
  }
}

export const _sanitizeInput = (input: string): string =>
  sanitizeHtml(markdownToTxt(input))

export const _getMantisIssueObject = (): {} => {
  const mantisObject: any = {
    summary: _sanitizeInput(core.getInput('summary', { required: true })),
    description: _sanitizeInput(
      core.getInput('description', { required: true })
    ),
    project: {
      id: _sanitizeInput(core.getInput('project-id', { required: true }))
    },
    category: {
      id: _sanitizeInput(core.getInput('category-id', { required: true }))
    }
  }

  if (core.getInput('additional-information') !== 'null')
    mantisObject.additional_information = _sanitizeInput(
      core.getInput('additional-information')
    )

  if (core.getInput('handler-name') !== 'null')
    mantisObject.handler = {
      name: _sanitizeInput(core.getInput('handler-name'))
    }

  if (core.getInput('view-state-name') !== 'null')
    mantisObject.view_state = {
      name: _sanitizeInput(core.getInput('view-state-name'))
    }

  if (core.getInput('priority-name') !== 'null')
    mantisObject.priority = {
      name: _sanitizeInput(core.getInput('priority-name'))
    }

  if (core.getInput('severity-name') !== 'null')
    mantisObject.severity = {
      name: _sanitizeInput(core.getInput('severity-name'))
    }

  if (core.getInput('reproducibility-name') !== 'null')
    mantisObject.reproducibility = {
      name: _sanitizeInput(core.getInput('reproducibility-name'))
    }

  if (core.getMultilineInput('tags').length)
    mantisObject.tags = core.getMultilineInput('tags').map(e => {
      return {
        name: _sanitizeInput(e)
      }
    })

  return mantisObject
}
