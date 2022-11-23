using FrontierChallenge.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Web;

namespace FrontierChallenge.Repositories
{
    /// <summary>
    /// Implements the data access layer for the domain objects
    /// </summary>
    public class JsonDataRepository : IJsonDataRepository
    {
        private readonly string _databaseFileName;

        private readonly JsonSerializerOptions _options = new(JsonSerializerDefaults.Web) { WriteIndented = true };

        public JsonDataRepository()
        {
            _databaseFileName = "data.json";
        }

        public JsonDataRepository(string databaseFileName)
        {
            _databaseFileName = databaseFileName;
        }


        /// <summary>
        /// Reads json from file
        /// </summary>
        private JsonData ReadFromFile()
        {
            var data = File.ReadAllText(_databaseFileName);
            return JsonSerializer.Deserialize<JsonData>(data, _options)!;
        }


        private static int GetNextId(List<Comment> comments)
        {
            var lvl1Max = comments.Max(x => x.Id);
            var lvl2Max = comments.SelectMany(x => x.Replies).Max(x => x.Id);

            return Math.Max(lvl1Max, lvl2Max) + 1;
        }


        private void WriteUpdated(JsonData data)
        {
            File.WriteAllText(_databaseFileName, JsonSerializer.Serialize(data, _options));
        }


        /// <summary>
        /// Return currentUser in the database
        /// </summary>
        public User GetCurrentUser()
        {
            return ReadFromFile().CurrentUser!;
        }

        /// <summary>
        /// Return list of comments in the database
        /// </summary>
        public List<Comment> GetComments()
        {
            var comments = ReadFromFile().Comments;

            foreach (var comment in comments)
                foreach (var reply in comment.Replies)
                {
                    reply.ReplyingToId = comment.Id;
                }

            return comments;
        }


        /// <summary>
        /// Saves the changes to the specified comment to the database
        /// </summary>
        public void Commit(Comment comment)
        {
            // Load Database
            var data = ReadFromFile();

            // Locate existing comment if it has been previously committed
            if (comment.Id != 0)
            {
                for (int i = 0; i < data.Comments.Count; i++)
                {
                    Comment dbComment = data.Comments[i];
                    if (dbComment.Id == comment.Id)
                    {
                        data.Comments[i] = comment;
                        break;
                    }
                    else
                    {
                        //check lvl2 comments
                        for (int j = 0; j < dbComment.Replies.Count; j++)
                        {
                            Comment reply = dbComment.Replies[j];
                            if (reply.Id == comment.Id)
                            {
                                data.Comments[i].Replies[j] = comment;
                                break;
                            }
                        }
                    }
                }
            }
            else
            {
                // Allocate a new Id
                comment.Id = GetNextId(data.Comments);

                if (comment.ReplyingToId == null)
                {
                    // Append new item to the top level list
                    data.Comments.Add(comment);
                }
                else
                {
                    // Append as child comment
                    var parentCommentIndex = data.Comments.FindIndex(x => x.Id == comment.ReplyingToId);
                    data.Comments[parentCommentIndex].Replies.Add(comment);
                }
            }

            // Save back everything
            WriteUpdated(data);
        }
        

        public void DeleteComment(int id)
        {
            // Load Database
            var data = ReadFromFile();

            foreach (Comment comment in data.Comments)
            {
                if (comment.Id == id)
                {
                    data.Comments.Remove(comment);
                    break;
                }
                else
                {
                    //check lvl2 comments
                    foreach (Comment reply in comment.Replies)
                    {
                        if (reply.Id == id)
                        {                            
                            comment.Replies.Remove(reply);
                            break;
                        }
                    }
                }
            }

            // Save back everything
            WriteUpdated(data);
        }
    }
}