using FrontierChallenge.Models;
using System;
using System.Collections.Generic;

namespace FrontierChallenge.Repositories
{
    public interface IJsonDataRepository
    {
        /// <summary>
        /// Saves the changes to the specified comment to the database
        /// </summary>
        void Commit(Comment comment);

        /// <summary>
        /// Return currentUser in the database
        /// </summary>
        User GetCurrentUser();


        /// <summary>
        /// Return list of comments in the database
        /// </summary>
        List<Comment> GetComments();

        /// <summary>
        /// Delete comment in the database
        /// </summary>
        void DeleteComment(int id);

    }
}