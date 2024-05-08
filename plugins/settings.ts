/**
 * This plugin contains all the logic for setting up the `Settings` singleton
 */

import { definePlugin, type DocumentDefinition } from 'sanity'
import { type StructureResolver } from 'sanity/desk'
import homepageSettings from 'schemas/homepageSettings'
import recentWorkSettings from 'schemas/settings/recentWorkSettings'
import { Iframe } from 'sanity-plugin-iframe-pane'
import { iframeOptions } from 'plugins/previewPane'

export const settingsPlugin = definePlugin<{ type: string }>(({ type }) => {
  return {
    name: 'settings',
    document: {
      // Hide 'Settings' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => templateItem.templateId !== type)
        }

        return prev
      },
      // Removes the "duplicate" action on the "settings" singleton
      actions: (prev, { schemaType }) => {
        if (schemaType === type) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
})

// The StructureResolver is how we're changing the DeskTool structure to linking to a single "Settings" document, instead of rendering "settings" in a list
// like how "Post" and "Author" is handled.
export const settingsStructure = (
  typeDef: DocumentDefinition,
): StructureResolver => {
  return (S) => {
    const individualTypes = [
      'homepageSettings',
      'settings',
      'recentWorkSettings',
      'recentWork',
      'media.tag',
      'author',
    ]

    // The `Settings` root list item
    const homepageSettingsListItem = // A singleton not using `documentListItem`, eg no built-in preview
      S.listItem()
        .title(homepageSettings.title)
        .icon(homepageSettings.icon)
        .child(
          S.editor()
            .title(homepageSettings.title)
            .id(homepageSettings.name)
            .schemaType(homepageSettings.name)
            .documentId(homepageSettings.name)
            .views([
              S.view.form(),
              S.view.component(Iframe).options(iframeOptions).title('Preview'),
            ]),
        )

    const recentWorkSettingsListItem = S.listItem()
      .title(recentWorkSettings.title)
      .icon(recentWorkSettings.icon)
      .child(
        S.editor()
          .title(recentWorkSettings.title)
          .id(recentWorkSettings.name)
          .schemaType(recentWorkSettings.name)
          .documentId(recentWorkSettings.name)
          .views([
            S.view.form(),
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ]),
      )

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) => !individualTypes.includes(listItem.getId()),
    )
    return S.list()
      .title('Content')
      .items([
        homepageSettingsListItem,
        recentWorkSettingsListItem,
        S.divider(),
        ...defaultListItems,
      ])
  }
}
