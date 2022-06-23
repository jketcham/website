package main

import (
  "log"
  "context"
  "os"

  "github.com/dstotijn/go-notion"
)


func GetPosts() notion.DatabaseQueryResponse {
  client := notion.NewClient(os.Getenv("NOTION_SECRET_TOKEN"))

  query := &notion.DatabaseQuery{
    Filter: &notion.DatabaseQueryFilter{
      Property: "Status",
      Select: &notion.SelectDatabaseQueryFilter{
        Equals: "Published",
      },
    },
    Sorts: []notion.DatabaseQuerySort{
      {
        Property:  "Date",
        Timestamp: notion.SortTimeStampLastEditedTime,
        Direction: notion.SortDirAsc,
      },
    },
  }

  res, err := client.QueryDatabase(context.Background(), "0c1e07941e9b45c5a83dee7e86d9bbe8", query)
  if err != nil {
    log.Fatal(err)
  }
  return res
}

func GetPost(id string) notion.Page {
  client := notion.NewClient(os.Getenv("NOTION_SECRET_TOKEN"))

  page, err := client.FindPageByID(context.Background(), id)
  if err != nil {
    log.Fatal(err)
  }
  return page
}

func queryBlockChildren(client *notion.Client, blockID string) (blocks []notion.Block, err error) {
	return retrieveBlockChildren(client, blockID)
}

func retrieveBlockChildrenLoop(client *notion.Client, blockID, cursor string) (blocks []notion.Block, err error) {
	for {
		query := &notion.PaginationQuery{
			StartCursor: cursor,
			PageSize:    100,
		}
		res, err := client.FindBlockChildrenByID(context.Background(), blockID, query)
		if err != nil {
			return nil, err
		}

		if len(res.Results) == 0 {
			return blocks, nil
		}

		blocks = append(blocks, res.Results...)
		if !res.HasMore {
			return blocks, nil
		}
		cursor = *res.NextCursor
	}
}

func retrieveBlockChildren(client *notion.Client, blockID string) (blocks []notion.Block, err error) {
	blocks, err = retrieveBlockChildrenLoop(client, blockID, "")
	if err != nil {
		return
	}

	for _, block := range blocks {
		if !block.HasChildren {
			continue
		}

		switch block.Type {
		case notion.BlockTypeParagraph:
			block.Paragraph.Children, err = retrieveBlockChildren(client, block.ID)
		case notion.BlockTypeCallout:
			block.Callout.Children, err = retrieveBlockChildren(client, block.ID)
		case notion.BlockTypeQuote:
			block.Quote.Children, err = retrieveBlockChildren(client, block.ID)
		case notion.BlockTypeBulletedListItem:
			block.BulletedListItem.Children, err = retrieveBlockChildren(client, block.ID)
		case notion.BlockTypeNumberedListItem:
			block.NumberedListItem.Children, err = retrieveBlockChildren(client, block.ID)
		case notion.BlockTypeTable:
			block.Table.Children, err = retrieveBlockChildren(client, block.ID)
		}

		if err != nil {
			return
		}
	}

	return blocks, nil
}
